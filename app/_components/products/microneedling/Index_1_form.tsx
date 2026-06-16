import CheckboxField from "../../CheckboxField";
import FileField from "../../FileField";
import InputField from "../../InputField";
import SubmitButton from "../../SubmitButton";
import TextareaField from "../../TextareaField";
import UndoButton from "../../UndoButton";

type Index_1_formProps = {
  mainValues:
    | {
        title?: string;
        text?: string;
        image_url?: string;
        is_active?: boolean;
      }
    | undefined
    | null;
  handleMainChange: (field: string, value: string | boolean) => void;
  handleMainSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedImageFile: File | null;
  setSelectedImageFile: (file: File | null) => void;
  handleMainUndo: () => void;
  hasMainChanges: boolean;
  isPendingMain: boolean;
  isAdmin: boolean;
};

export default function Index_1_form({
  mainValues,
  handleMainChange,
  handleMainSubmit,
  selectedImageFile,
  setSelectedImageFile,
  handleMainUndo,
  hasMainChanges,
  isPendingMain,
  isAdmin,
}: Index_1_formProps) {
  return (
    <>
      <div className="px-6 pb-2 pt-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
            Nastavenia obsahu
          </p>
          <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
            Microneedling
          </h1>
        </div>
      </div>

      <form onSubmit={handleMainSubmit} className="space-y-5 px-5 pb-2 md:px-8">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Názov"
            value={mainValues?.title ?? ""}
            onChange={(e) => handleMainChange("title", e.target.value)}
            readOnly={!isAdmin}
          />
          <TextareaField
            label="Obsah"
            value={mainValues?.text ?? ""}
            onChange={(e) => handleMainChange("text", e.target.value)}
            readOnly={!isAdmin}
            rows={18}
          />

          <FileField
            type="file"
            label="Hlavná fotka (image_url)"
            value={mainValues?.image_url ?? ""}
            onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
            readOnly={!isAdmin}
          />
          {selectedImageFile ? (
            <p className="text-xs text-greyMain/80">
              Vybraný súbor: {selectedImageFile.name}
            </p>
          ) : null}
          <CheckboxField
            labelActive="Aktívne"
            labelInactive="Neaktívne"
            checked={mainValues?.is_active ?? false}
            onChange={(e) => handleMainChange("is_active", e.target.checked)}
            disabled={!isAdmin}
          />
          <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
            <UndoButton
              onClick={handleMainUndo}
              disabled={!hasMainChanges || isPendingMain || !isAdmin}
            >
              Undo
            </UndoButton>

            <SubmitButton
              loading={isPendingMain}
              disabled={!hasMainChanges || isPendingMain || !isAdmin}
            >
              Uložiť zmeny
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
}
