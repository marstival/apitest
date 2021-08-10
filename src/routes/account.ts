import express, { Request, Response } from 'express';
import { InvalidAccountException } from '../errors/invalid-account';
import {
  balance,
  deposit,
  withdraw,
  reset,
  transfer,
} from '../core/account-core';
import { Account } from '../core/account-model';
const router = express.Router();

router.post('/reset', async (req: Request, res: Response) => {
  console.log('reset');
  reset();

  res.status(200).send('OK');
});

// GET /balance?account_id=
router.get('/balance', async (req: Request, res: Response) => {
  console.log('/balance ');
  console.log(req.query.account_id);

  const param: string = req.query.account_id as string;

  console.log('/balance ');
  console.log(req.query);

  let acc: Account = balance(parseInt(param));

  if (acc) {
    res.status(200).send(acc.balance.toString());
  } else {
    res.status(404).send('0');
  }
});

router.post('/event', async (req: Request, res: Response) => {
  const { type, destination, origin, amount } = req.body;
  console.log(req.body);
  let dest_id = parseInt(destination);
  let orig_id = parseInt(origin);
  try {
    if (type == 'deposit') {
      let acc: Account = deposit(dest_id, amount);
      res.status(201).send({ destination: acc });
    }

    if (type == 'withdraw') {
      let acc = withdraw(orig_id, amount);
      res.status(201).send({ origin: acc });
    }

    if (type == 'transfer') {
      let result = transfer(orig_id, dest_id, amount);

      res
        .status(201)
        .send({ origin: result['origin'], destination: result['destination'] });
    }
  } catch (e) {
    if (e instanceof InvalidAccountException) {
      console.log(e);
      res.status(e.statusCode).send(e.returnContent);
    } else {
      console.log(e);
      res.status(404).send('unknown error');
    }
  }
});

export { router as accountRouter };
