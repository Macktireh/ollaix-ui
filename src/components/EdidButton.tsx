import { Pencil } from "lucide-react";

type Props = {
  setEditing: () => void;
};

export function EditButton({ setEditing }: Props) {
  return (
    <button
      className="btn btn-ghost btn-xs rounded-md hover:bg-base-content/12"
      onClick={setEditing}
    >
      <Pencil size={14} />
    </button>
  );
}
