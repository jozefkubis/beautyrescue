import BotulotoxinMainPage_update_form from "./BotulotoxinMainPage_update_form";
import type { BotulotoxinMainProps } from "@/app/_lib/data_services/data_botulotoxin";

type Botulotoxin_update_formProps = {
  botulotoxinData: BotulotoxinMainProps["botulotoxinData"] | null;
  isAdmin?: boolean;
};

export default function Botulotoxin_update_form({botulotoxinData, isAdmin}: Botulotoxin_update_formProps) {
  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:gap-4 lg:p-8 lg:px-44">
        <BotulotoxinMainPage_update_form botulotoxinData={botulotoxinData} isAdmin={isAdmin} />
      </div>
    </section>
  );
}
