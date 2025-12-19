"use client"
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export interface Props{
    message: string;
    href: string;
}

const Button = ({message, href}: Props) => {
  return (
    <StyledWrapper>
      <Link href={href} className="button flex items-center justify-center gap-2">
        <span className="text">{message}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    background-color: transparent;
    color: #fff;
    width: 8.5em;
    height: 2.9em;
    border: #3654ff 0.2em solid;
    border-radius: 11px;
    transition: all 0.6s ease;
    text-decoration: none;
  }

  .button:hover {
    background-color: #3654ff;
    cursor: pointer;
  }

  .button svg {
    width: 1.6em;
    display: block;
    transition: transform 0.6s ease;
  }

  .button:hover svg {
    transform: translateX(5px);
  }

  .text {
    font-weight: 500;
  }`;

export default Button;
