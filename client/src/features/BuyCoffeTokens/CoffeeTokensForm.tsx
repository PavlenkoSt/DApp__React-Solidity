import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { BaseError } from "viem";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/Button";
import { ITransactionHash } from "@/shared/types/TransactionHash";
import { useWritePurchaseTokens } from "@/features/Contracts";
import { useCurrentBalance } from "@/features/Account";
import { IForm, schema } from "./index";

export const CoffeeTokensForm = () => {
  const { purchase, hash, isPending, error } = useWritePurchaseTokens();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { balance } = useCurrentBalance();

  const [hashes, setHashes] = useState<ITransactionHash[]>([]);

  const loading = isPending || isLoading;

  useEffect(() => {
    if (isSuccess && hash && !hashes.includes(hash)) {
      setHashes((prev) => [...prev, hash]);
      toast("Request sent");
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

  const onSubmit: SubmitHandler<IForm> = async ({ amount }) => {
    purchase({ amount });
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
        <Label>Amount</Label>
        <input
          disabled={loading}
          style={inputStyles}
          type="number"
          step="1"
          {...register("amount")}
        />
        {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
      </FormGroup>

      {!!error && (
        <Error>{(error as BaseError).shortMessage || error.message}</Error>
      )}

      <Button $variant="primary" type="submit" loading={loading}>
        Buy
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
