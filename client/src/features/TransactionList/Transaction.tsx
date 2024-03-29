import { formatEther } from "viem";
import styled from "styled-components";
import { ITransaction } from "./index";

interface IProps {
  transaction: ITransaction;
}

export function Transaction({ transaction }: IProps) {
  const { receiver, sender, amount, message, keyword, timestamp } = transaction;

  const eth = formatEther(BigInt(amount)).toString();
  const date = new Date(Number(timestamp) * 1000).toLocaleString();

  return (
    <Container>
      <Header>
        <TextItem>
          Date: <TextValue>{date}</TextValue>
        </TextItem>
        <TextItem>
          From: <TextValue>{sender}</TextValue>
        </TextItem>
        <TextItem>
          To: <TextValue>{receiver}</TextValue>
        </TextItem>
        <TextItem>
          Amount: <TextValue>{eth} ETH</TextValue>
        </TextItem>
        <TextItem>
          Message: <TextValue>{message}</TextValue>
        </TextItem>
        <TextItem>
          keyword: <TextValue>{keyword}</TextValue>
        </TextItem>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgba(12, 13, 15, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.75);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const TextItem = styled.div`
  font-size: 0.7rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
`;

const TextValue = styled.span`
  font-size: 0.7rem;
  color: #fff;
`;
