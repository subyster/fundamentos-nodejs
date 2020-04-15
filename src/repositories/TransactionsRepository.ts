import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce(
      (total, transaction) =>
        transaction.type === 'income' ? total + transaction.value : total,
      0,
    );

    const totalOutcome = this.transactions.reduce(
      (total, transaction) =>
        transaction.type === 'outcome' ? total + transaction.value : total,
      0,
    );

    const totalBalance = totalIncome - totalOutcome;
    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
