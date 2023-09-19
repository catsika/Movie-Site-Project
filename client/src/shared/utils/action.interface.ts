import { InputActionsType } from "../../hooks/input/models/inputActions";

export interface Action<T> {
  type: T;
  value?: string;
}
