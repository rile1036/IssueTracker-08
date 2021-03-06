import React from 'react';
import styled from 'styled-components';

import IssueForm from '../../components/issue/IssueForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 30px;
  width: 80%;
  max-width: 1400px;
  margin: auto;
`;

const userId = localStorage.getItem('userId');

export default function IssuePostPage() {
  return (
    <>
      <Container>
        <IssueForm userId={userId} />
      </Container>
    </>
  );
}
