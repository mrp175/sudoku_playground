import { Input } from "../Grid/Board.styled";

export function createSubGrid(
  subGridRefs: React.MutableRefObject<HTMLInputElement[]>
) {
  const result = [];
  for (let i = 0; i < 9 * 9; i += 1) {
    result.push(
      <div>
        <Input
          type="number"
          max="9"
          min="0"
          ref={(el) => {
            subGridRefs.current?.push(el!);
          }}
        />
      </div>
    );
  }
  return result;
}
