import "knex";

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      session_id: string;
      type: "credit" | "debit";
    };
  }
}
