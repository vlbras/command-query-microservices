export class FindUserQuery {
  public constructor(public readonly data: FindUserQueryData) {}
}

type FindUserQueryData = {
  id: string;
};
