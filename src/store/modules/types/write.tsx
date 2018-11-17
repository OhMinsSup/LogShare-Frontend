import { writeCreators } from '../write';

export type ChangeInputPayload = { name: string; value: string };

export type ChangeInputAction = ReturnType<typeof writeCreators.changeInput>;
