import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/shared/ui/Button";
import { useAccount } from "@/features/Account";
import { useContracts } from "@/features/Contracts";

const schema = z.object({
  toAddress: z
    .string()
    .min(42, { message: "Invalid address" })
    .max(42, { message: "Invalid address" }),
  amount: z.string().refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number) && number > 0;
    },
    {
      message: "Must be a positive number",
    },
  ),
  message: z
    .string()
    .min(1, { message: "Required" })
    .max(200, { message: "Max 200 characters" }),
  keyword: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Max 20 characters" }),
});

type IForm = z.infer<typeof schema>;

export const TransactionForm = () => {
  const [loading, setLoading] = useState(false);

  const { getBalance } = useAccount();
  const { transactionContract } = useContracts();

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
    if (!window.ethereum || !transactionContract) return;

    try {
      setLoading(true);

      const value = ethers.parseEther(amount);

      await transactionContract.setTransaction(toAddress, message, keyword, {
        value,
      });

      toast("Transaction sent to blockchain, pending");
      reset();
    } catch (e: any) {
      console.error("e", e);
      if (e?.message?.includes("insufficient funds")) {
        toast.error("insufficient funds");
        return;
      }
      if (e?.message?.includes("user rejected action")) {
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const listener = (
      from: string,
      to: string,
      amount: string,
      message: string,
      keyword: string,
      timestamp: number,
    ) => {
      getBalance();
      const value = ethers.formatUnits(amount, "ether");
      toast.success(`${value} ETH successfully sent to ${to}`);
    };

    transactionContract?.on("Transfer", listener);

    return () => {
      transactionContract?.off("Transfer", listener);
    };
  }, [transactionContract, toast]);

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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          style={inputStyles}
          {...register("keyword")}
        />
        {errors.keyword && (
          <ErrorMessage>{errors.keyword.message}</ErrorMessage>
        )}
      </FormGroup>

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
