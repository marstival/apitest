//   # Create account with initial balance
//   # Deposit into existing account
import { InvalidAccountException } from '../errors/invalid-account';
import { Account } from './account-model';

let accounts: { [id: string]: Account } = {}; //100: {id:100, balance:10}

export function reset(): void {
  accounts = {};
}

export function balance(param: string): Account {
  return accounts[param];
}

export function deposit(dest_id: string, amount: number): Account {
  let acc = accounts[dest_id];
  if (acc) {
    //existing account
    acc.balance = acc.balance + amount;
  } else {
    //create account
    accounts[dest_id] = { id: dest_id, balance: amount };
  }
  return accounts[dest_id];
}
export function withdraw(orig_id: string, amount: number): Account {
  let acc = accounts[orig_id];
  if (acc) {
    //existing account
    acc.balance = acc.balance - amount;
    return acc;
  } else {
    //account does not exist
    throw new InvalidAccountException('Origin account does not exist');
  }
}
export function transfer(
  orig_id: string,
  dest_id: string,
  amount: number
): { destination: Account; origin: Account } {
  let origin = accounts[orig_id];

  if (!origin) {
    throw new InvalidAccountException('Origin account does not exist');
  }

  deposit(dest_id, amount);
  //debit
  origin.balance = origin.balance - amount;
  return { destination: accounts[dest_id], origin: accounts[orig_id] };
}
