import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Index");
	return <p>{t("title")}</p>;
}
