import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { ContractTransactionResponse } from "ethers";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/shared/ui/Button";
import { useContracts } from "@/features/Contracts";

const schema = z.object({
  amount: z.string().refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number) && number > 0;
    },
    {
      message: "Must be a positive number",
    },
  ),
});

type IForm = z.infer<typeof schema>;

interface IProps {
  setTransactionHash: Dispatch<
    SetStateAction<ContractTransactionResponse | null>
  >;
}

export const CoffeeTokensForm = ({ setTransactionHash }: IProps) => {
  const [loading, setLoading] = useState(false);

  const { tokenMarketplaceContract } = useContracts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({ amount }) => {
    if (!window.ethereum || !tokenMarketplaceContract) return;

    try {
      setLoading(true);

      const priceInWei =
        (await tokenMarketplaceContract.priceInWei()) as unknown as string;

      if (!priceInWei) throw new Error("Price not found");

      const value = Number(priceInWei) * +amount;

      const hash = await tokenMarketplaceContract.purchaseTokens(amount, {
        value,
      });

      setTransactionHash(hash);

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
