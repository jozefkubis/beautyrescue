type FileFieldProps = {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  accept?: string;
  type?: "file";
};

// Komponent pre výber súboru so zjednoteným štýlom ako ostatné formulárové polia.
export default function FileField({
  label,
  value,
  onChange,
  readOnly = false,
  accept,
  type = "file",
}: FileFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
        {label}
      </span>

      {/* File input nesmie byť controlled cez value, preto ho nechávame bez value atribútu. */}
      <div className="rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 transition focus-within:border-goldDark/35 hover:cursor-pointer">
        <input
          type={type}
          onChange={onChange}
          disabled={readOnly}
          accept={accept}
          className="block hover:cursor-pointer w-full text-sm text-gray-800 file:mr-3 file:rounded-full file:border-0 file:bg-[#fff6ee] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-goldDark hover:file:bg-[#ffeedf] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {value ? (
        <p className="text-xs text-greyMain/80">
          Aktuálny obrázok je nastavený.
        </p>
      ) : null}
    </label>
  );
}
