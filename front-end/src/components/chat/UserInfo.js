import React, { useState } from "react";
import styled from "styled-components";
import {
  FaInfo,
  FaBell,
  FaFileAlt,
  FaCamera,
  FaVideo,
  FaLink,
  FaMicrophone,
} from "react-icons/fa";

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px; /* Adjust width as needed */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  background-color: #651976;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; /* Adjust font size as needed */
`;

const NameSection = styled.div`
  margin-left: 15px;

  h3 {
    margin: 0 0 5px; /* Adjust margin as needed */
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px; /* Adjust font size as needed */

  svg {
    margin-right: 8px;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin-left: 8px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #651976;
  }

  input:checked + span:before {
    transform: translateX(14px);
  }
`;

const BlockButton = styled.button`
  background-color: #dc3545; /* Red color */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 20px;
`;

const AddContactButton = styled.button`
  width: 100%;
  background-color: #28a745; /* Green color */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const UserInfo = () => {
  return (
    <UserInfoContainer>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar>H</Avatar>
          <NameSection>
            <h3>Hasan</h3>
            <p>был(a) 19 минут назад</p>
          </NameSection>
        </div>
        <CloseButton>&times;</CloseButton>
      </Header>
      <InfoItem>
        <FaInfo style={{ fill: "var(--accent)" }} />
        @hasan_nurlanov
      </InfoItem>
      <InfoItem>
        <AddContactButton className="mt-3 mb-3 btn btn-primary">
          ADD TO CONTACTS
        </AddContactButton>
      </InfoItem>
      <InfoItem>
        <FaBell style={{ fill: "var(--accent)" }} />
        Notifications
        <ToggleSwitch>
          <input type="checkbox" />
          <span />
        </ToggleSwitch>
      </InfoItem>
      <InfoItem>
        <FaFileAlt style={{ fill: "var(--accent)" }} />
        432 поста
      </InfoItem>
      <InfoItem>
        <FaCamera style={{ fill: "var(--accent)" }} />
        89 фото
      </InfoItem>
      <InfoItem>
        <FaVideo style={{ fill: "var(--accent)" }} />
        54 видео
      </InfoItem>
      <InfoItem>
        <FaFileAlt style={{ fill: "var(--accent)" }} />
        12 файлов
      </InfoItem>
      <InfoItem>
        <FaLink style={{ fill: "var(--accent)" }} />
        35 общих ссылок
      </InfoItem>
      <InfoItem>
        <FaMicrophone style={{ fill: "var(--accent)" }} />
        12 голосовых сообщений
      </InfoItem>
      <BlockButton className="btn btn-secondary">Block User</BlockButton>
    </UserInfoContainer>
  );
};

export default UserInfo;
