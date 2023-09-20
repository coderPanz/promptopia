"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const [ isLogin, setIsLogin ] = useState(false)
  // 创建一个state表示当前的登录状态
  const { data: session } = useSession()
  // 第三方验证提供者
  const [providers, setProviders] = useState(null)

  // 点击右侧头像显示下拉菜单
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await getProviders()
      setProviders(response)
    })()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src='/assets/images/logo.svg'
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* 桌面端导航界面 */}
      <div className='sm:flex hidden'>
        { session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link 
              href='/create-prompt'
              className='black_btn'
            >
              Create Post
            </Link>
            <button 
              type='button' 
              onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image 
                src={session?.user?.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ): (
          <>
            {
              providers && 
              Object.values(providers).map((provider) => (
                <button 
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className='black_btn'
                >
                  Sign In
                </button>
              )
              )
            }
          </>
        )}
      </div>

      {/* 移动端导航界面(或者是桌面端网页宽度缩小到一定像素适配) */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className='flex'>
              <Image 
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {
                toggleDropdown && (
                  <div className='dropdown'>
                    <Link 
                      href='/profile'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      href='/create-prompt'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type='button'
                      className='mt-5 w-full black_btn'
                      onClick={() => {
                        setToggleDropdown(false)
                        signOut()
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
            {
              providers && 
              Object.values(providers).map((provider) => (
                <button 
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              )
              )
            }
          </>
          )
        }
      </div>
    </nav>
  )
}
  
export default Nav
