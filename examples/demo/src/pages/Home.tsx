import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useTranslation } from "../context/LanguageContext";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-16 py-10">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {t("home.title_prefix")}{" "}
          <span className="text-indigo-600">{t("home.title_highlight")}</span>{" "}
          {t("home.title_suffix")}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {t("home.subtitle")}
        </p>
        <div className="flex items-center justify-center md:gap-4 gap-2 pt-4">
          <Button
            size="md"
            className="md:text-lg xs:text-base xs:px-2 md:px-8 sm:h-11"
            onClick={() => navigate("/docs/introduction")}
          >
            {t("home.get_started")}
          </Button>
          <Button
            variant="outline"
            size="md"
            className="md:text-lg xs:text-base sm:h-11"
            onClick={() => navigate("/examples")}
          >
            {t("home.view_examples")}
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl">
            ⚡
          </div>
          <h3 className="text-xl font-bold">{t("home.feature_fast")}</h3>
          <p className="text-gray-600">{t("home.feature_fast_desc")}</p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl">
            🛡️
          </div>
          <h3 className="text-xl font-bold">{t("home.feature_types")}</h3>
          <p className="text-gray-600">{t("home.feature_types_desc")}</p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 text-2xl">
            🧩
          </div>
          <h3 className="text-xl font-bold">{t("home.feature_headless")}</h3>
          <p className="text-gray-600">{t("home.feature_headless_desc")}</p>
        </div>
      </div>

      <section className="bg-indigo-900 rounded-3xl p-12 text-center text-white space-y-6">
        <h2 className="text-3xl font-bold">{t("home.ready_title")}</h2>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto">
          {t("home.ready_desc")}
        </p>
        <div className="bg-indigo-950/50 p-4 rounded-xl font-mono text-indigo-300 inline-block">
          npm install wizzard-stepper-react
        </div>
      </section>
    </div>
  );
}
