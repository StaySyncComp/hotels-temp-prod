import { prismaClient } from "../prisma";
import { Response } from "express";
import { ExtendedRequest } from "../types/users/usersRequests";
import { deleteImage } from "../utils/supabaseUtils";
import { getDynamicData, getUpdatedFields } from "../utils/dynamicData";
import { getScopedResource } from "../utils/controllerUtils";
import { Department } from "@prisma/client";

export const createDepartment = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  const userId = req.user?.id;
  const { name, organizationId, logo } = req.body;

  if (!userId)
    return res.status(400).json({ message: "Missing required fields: userId" });
  if (!organizationId)
    return res
      .status(400)
      .json({ message: "Missing required fields: organizationId" });
  if (!name || typeof name !== "object" || Object.keys(name).length === 0)
    return res.status(400).json({
      message:
        "Missing required fields: name (must be an object with translations)",
    });

  try {
    const department = await prismaClient.department.create({
      data: {
        name,
        logo: logo || "",
        organization: { connect: { id: organizationId } },
      },
    });

    if (!department)
      return res.status(400).json({ message: "שגיאה ביצירת המחלקה" });

    return res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the department" });
  }
};

export const getAllDepartments = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    const result = await prismaClient.department.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllDepartments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDepartments = async (req: ExtendedRequest, res: Response) => {
  return getDynamicData(req, res, {
    model: "department",
    searchFields: [
      { path: "$.he", field: "name" },
      { path: "$.en", field: "name" },
      { path: "$.ar", field: "name" },
    ],
    includeCounts: { OrganizationRole: true },
    departmentWhereClause: (departmentIds) => ({
      id: { in: departmentIds },
    }),
    defaultSortField: "name",
  });
};

export const deleteDepartment = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  const { departmentId } = req.query;

  try {
    const department = await getScopedResource<Department>({
      model: "department",
      where: { id: Number(departmentId) },
      req,
      res,
      extractDepartmentIds: (department) => [department.id],
      resourceName: "Department",
    });

    if (!department) return; // If no department found, return early

    const result = await prismaClient.department.delete({
      where: { id: department.id },
    });

    if (result.logo) await deleteImage(result.logo);

    if (!result) {
      res.status(404).json({ message: "Department not deleted" });
    } else {
      res.status(200).json({ message: "Department deleted" });
    }
  } catch (error) {
    console.error("Error in deleteDepartment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDepartment = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  const { name, logo } = req.body;
  const { id } = req.params;

  try {
    const department = await getScopedResource<Department>({
      model: "department",
      where: { id: Number(id) },
      req,
      res,
      extractDepartmentIds: (department) => [department.id],
      resourceName: "Department",
    });
    if (!department) return;

    const result = await prismaClient.department.update({
      where: { id: department.id },
      data: { name, logo: logo || "" },
    });

    if (!result) {
      res.status(404).json({ message: "Department not updated" });
    } else {
      res.status(200).json({ message: "Department updated" });
    }
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
