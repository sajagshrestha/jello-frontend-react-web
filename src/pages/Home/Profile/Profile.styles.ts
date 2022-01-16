import styled from "styled-components";
interface UserStatsSectionProps {
  center?: boolean;
}
export const UserInfoSection = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 2fr;
`;

export const UserName = styled.h1``;

export const UserStatsSection = styled.div`
  display: flex;
  justify-content: ${(props: UserStatsSectionProps) =>
    props.center ? "center" : "start"};
  flex-direction: column;
  height: 100%;
  gap: 0.7rem;
  padding-top: 2.1rem;
`;

export const FollowerInformationSection = styled.div`
  display: flex;
  padding-bottom: 1rem;
  gap: 3rem;
`;

export const Stats = styled.div``;

export const StatsName = styled.span``;

export const StatsValue = styled.span`
  text-align: center;
  font-weight: bold;
  margin-right: 0.5rem;
`;
