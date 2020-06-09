import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RepositoryType {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RepositoryType): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('You have no available balance');
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
