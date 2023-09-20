'use client';

// 在 Provider 组件的 JSX 中，我们使用 SessionProvider 组件将当前用户的会话信息通过 React 上下文传递给 children 子组件。这样，在子组件中就可以通过使用 NextAuth 的 useSession() Hook 获取当前用户的会话信息了。

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;
