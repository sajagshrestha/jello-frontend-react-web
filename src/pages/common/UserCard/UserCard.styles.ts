import { Button } from "@mui/material";
import styled from "styled-components";

export const UserCardContainer = styled.div`
  display: grid;
  grid-template-columns: 75px auto 150px;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const UserDetails = styled.div`
  cursor: pointer;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
`;

export const Stats = styled.div``;

export const StatsName = styled.span``;

export const StatsValue = styled.span`
  text-align: center;
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Follow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Following = styled(Button)`
  border: ${({ theme }) => theme.border};
`;
