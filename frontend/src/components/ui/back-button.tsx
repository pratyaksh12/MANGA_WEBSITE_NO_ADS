"use client"
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export interface Props{
    message: string;
    href: string;
}

const BackButton = ({message, href}: Props) => {
  return (
    <StyledWrapper>
      <button className="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
        <div className="text">
          <Link href={href}>{message}</Link>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    background-color: #ffffff00;
    color: #fff;
    width: 8.5em;
    height: 2.9em;
    border: #3654ff 0.2em solid;
    border-radius: 11px;
    text-align: right;
    transition: all 0.6s ease;
  }

  .button:hover {
    background-color: #3654ff;
    cursor: pointer;
  }

  .button svg {
    width: 1.6em;
    margin: -0.2em 0.8em 1em;
    position: absolute;
    display: flex;
    transition: all 0.6s ease;
  }

  .button:hover svg {
    transform: translateX(-5px);
  }

  .text {
    margin: 0 1.5em
  }`;

export default BackButton;
