export default function EmptyUsersList() {
  return (
    <div className="rounded-[28px] border border-goldDark/15 bg-[linear-gradient(180deg,rgba(255,252,247,0.94)_0%,rgba(255,245,235,0.88)_100%)] px-6 py-10 text-center shadow-[0_14px_32px_rgba(157,116,16,0.08)]">
      <p className="text-lg font-semibold text-goldDark">
        Zatiaľ tu nie sú žiadni používatelia.
      </p>
      <p className="mt-2 text-sm text-greyMain/80">
        Keď sa niekto zaregistruje, zobrazí sa v tomto zozname.
      </p>
    </div>
  );
}
