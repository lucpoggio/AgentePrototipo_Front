import React, { useMemo } from 'react'
import Layout from './components/Layout'
import { useNavigation } from './context/NavigationContext'
import { HomePage, ChatPage, CustomizationPage } from './pages'
import type { Page } from './types'

const pageComponents: Record<Page, React.FC> = {
  home: HomePage,
  chat: ChatPage,
  customization: CustomizationPage,
}

const App: React.FC = () => {
  const { activePage } = useNavigation()

  const PageComponent = useMemo(() => pageComponents[activePage] || HomePage, [activePage])

  return (
    <Layout>
      <div key={activePage} style={{ animation: 'fadeIn 0.25s ease' }}>
        <PageComponent />
      </div>
    </Layout>
  )
}

export default App
