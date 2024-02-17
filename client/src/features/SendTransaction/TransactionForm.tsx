import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { BaseError } from "viem";
import { Button } from "@/shared/ui/Button";
import { ITransactionHash } from "@/shared/types/TransactionHash";
import { useWriteTransaction } from "@/features/Contracts";
import { useCurrentBalance } from "@/features/Account";
import { schema, IForm } from "./index";

export const TransactionForm = () => {
  const { sendTransaction, hash, error, isPending } = useWriteTransaction();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { balance } = useCurrentBalance();

  const [hashes, setHashes] = useState<ITransactionHash[]>([]);

  const loading = isPending || isLoading;

  useEffect(() => {
    if (isSuccess && hash && !hashes.includes(hash)) {
      setHashes((prev) => [...prev, hash]);
      toast("Transaction sent to blockchain");
      balance.refetch();
      reset();
    }
  }, [isSuccess, hash, hashes]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({
    toAddress,
    amount,
    keyword,
    message,
  }) => {
    sendTransaction({ toAddress, amount, keyword, message });
  };

  const onError: SubmitErrorHandler<IForm> = (errors) => {
    console.error(errors);
    toast.error("Error, check messages");
  };

  const inputStyles = {
    padding: 10,
    margin: 5,
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 4,
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <FormGroup>
        <Label>To Address</Label>
        <input
          disabled={loading}
          style={inputStyles}
          {...register("toAddress")}
        />
        {errors.toAddress && (
          <ErrorMessage>{errors.toAddress.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Amount</Label>
        <input
          disabled={isLoading}
          style={inputStyles}
          type="number"
          step="0.001"
          {...register("amount")}
        />
        {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Message</Label>
        <input
          disabled={isLoading}
          style={inputStyles}
          {...register("message")}
        />
        {errors.message && (
          <ErrorMessage>{errors.message.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Keyword</Label>
        <input
          disabled={isLoading}
          style={inputStyles}
          {...register("keyword")}
        />
        {errors.keyword && (
          <ErrorMessage>{errors.keyword.message}</ErrorMessage>
        )}
      </FormGroup>

      {!!error && (
        <Error>{(error as BaseError).shortMessage || error.message}</Error>
      )}

      <Button $variant="primary" type="submit" loading={loading}>
        Send
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin: 0 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin: 0 5px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
`;
