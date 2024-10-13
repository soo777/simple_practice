import React from 'react';
import './App.css';
import '@atlaskit/css-reset';
import UserPage from './pages/user/UserPage';
import { Route, Routes } from 'react-router-dom';
import PostPage from './pages/post/PostPage';
import TodoListPage from './pages/todo/TodoListPage';
import Menu from './components/Menu';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <Menu />
        <Routes>
          <Route path="/" element={<UserPage />}></Route>
          <Route path="/user" element={<UserPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/todoList" element={<TodoListPage />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
