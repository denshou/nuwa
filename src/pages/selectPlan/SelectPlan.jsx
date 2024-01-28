import styled from 'styled-components';
import PlanCard from './PlanCard';
import PageTitle from './PageTitle';
import { SELECT_PLAN_INFO } from '@constants/constants';
import PlanCardPro from './PlanCardPro';
const SelectPlan = () => {
  return (
    <StContainer>
      <PageTitle />
      <StCardContainer>
        {SELECT_PLAN_INFO.map((item) => {
          return item.id !== 'PRO' ? (
            <PlanCard
              key={item.id}
              id={item.id}
              headerTitle={item.headerTitle}
              headerText={item.headerText}
              middlePrimary={item.middlePrimary}
              footer={item.footer}
            />
          ) : (
            <PlanCardPro
              key={item.id}
              id={item.id}
              headerTitle={item.headerTitle}
              headerText={item.headerText}
              middlePrimary={item.middlePrimary}
              footer={item.footer}
            />
          );
        })}
      </StCardContainer>
    </StContainer>
  );
};

export default SelectPlan;

// 1920 * 1080 기준
const StContainer = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  display: flex;
  flex-direction: column;
  gap: 7rem;
  justify-content: center;
  align-items: start;
`;
const StCardContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
