import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-surface">
        {t("privacyPolicy.title")}
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p className="text-sm text-gray-500 mb-4">
          {t("privacyPolicy.lastUpdated", { date: "2025-02-04" })}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.intro")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.introText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.collection")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.collectionText")}</p>

          <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-surface">
            {t("privacyPolicy.personalData")}
          </h3>
          <p className="mb-4">{t("privacyPolicy.personalDataText")}</p>

          <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-surface">
            {t("privacyPolicy.derivativeData")}
          </h3>
          <p className="mb-4">{t("privacyPolicy.derivativeDataText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.use")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.useText")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <li key={item}>{t(`privacyPolicy.useList.${item}`)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.disclosure")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.disclosureText")}</p>

          <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-surface">
            {t("privacyPolicy.law")}
          </h3>
          <p className="mb-4">{t("privacyPolicy.lawText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.security")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.securityText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.children")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.childrenText")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-surface">
            {t("privacyPolicy.contact")}
          </h2>
          <p className="mb-4">{t("privacyPolicy.contactText")}</p>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="font-medium">
              <a
                href={`mailto:${t("privacyPolicy.contactEmail")}`}
                className="text-blue-600 dark:text-blue-300 hover:underline"
              >
                {t("privacyPolicy.contactEmail")}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
