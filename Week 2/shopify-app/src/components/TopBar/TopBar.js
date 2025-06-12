import { Icon, TopBar } from "@shopify/polaris"
import { ArrowLeftIcon, SidekickIcon, NotificationIcon } from "@shopify/polaris-icons"
function Header() {

  const Search = (
    <TopBar.SearchField
      placeholder="Search"
    />
  )
  // Right content
  const SecondaryMenuMarkup = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TopBar.Menu
        activatorContent={<Icon source={SidekickIcon} />}
        actions={[{ items: [{ content: 'Profile' }] }]}
      />
      <TopBar.Menu
        activatorContent={<Icon source={NotificationIcon} />}
        actions={[{ items: [{ content: 'Notifications' }] }]}
      />
    </div>
  );
  const UserMenuMarkup = (
    <div>
      <TopBar.UserMenu
        action={[
          {
            items: [{ content: 'Back to Shopify', icon: ArrowLeftIcon }],
          },
          {
            items: [{ content: 'Community forums' }],
          },
        ]}
        detail={
          <span style={{ color: 'white' }}>
            Stellar Interiors
          </span>
        }
        avatar="https://i.pinimg.com/736x/86/2c/e2/862ce2907b6220ff9614cff0673a6791.jpg"

      />
    </div>
  )
  return (
    <div>
      <TopBar
        searchField={Search}
        // Right content
        secondaryMenu={SecondaryMenuMarkup}
        userMenu={UserMenuMarkup}
      />
    </div>
  )
}

export default Header