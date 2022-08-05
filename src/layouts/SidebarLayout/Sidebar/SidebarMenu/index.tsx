import { useContext } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

let nowDishTag = "素菜";

export {
  nowDishTag
}



function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;
  let handleDishTag = (dishTag) =>{
    closeSidebar();
    nowDishTag = dishTag;
    console.log(nowDishTag);
  }
  return (
    <>
      <MenuWrapper>
        <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
          <SubMenuWrapper>
            <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
              <ListItem component="div">
                <NextLink href="/orderdishes/素菜" passHref>
                  <Button
                    // className={currentRoute === '="/' ? 'active' : ''}
                    style={{
                      backgroundColor: nowDishTag === '精品锅底' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={()=>handleDishTag("精品锅底")}
                    startIcon={<DesignServicesTwoToneIcon />}
                  >
                    精品锅底
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              新品推荐
            </ListSubheader>
          }
          style={{paddingLeft:'0',paddingRight:'0'}}
        >
          <SubMenuWrapper>
            <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
              <ListItem component="div">
                <NextLink href="/orderdishes/全新套餐" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/orderdishes' ? 'active' : ''
                    // }
                    style={{
                      backgroundColor: nowDishTag === '全新套餐' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    fullWidth
                    disableRipple
                    component="a"
                    onClick={()=>handleDishTag("全新套餐")}
                    startIcon={<BrightnessLowTwoToneIcon />}
                  >
                    全新套餐
                  </Button>
                </NextLink>
              </ListItem>
              {/* <ListItem component="div">
                <NextLink href="/applications/messenger" passHref>
                  <Button
                    className={
                      currentRoute === '/applications/messenger' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<MmsTwoToneIcon />}
                  >
                    Messenger
                  </Button>
                </NextLink>
              </ListItem> */}
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              畅销菜品
            </ListSubheader>
          }
          style={{paddingLeft:'0',paddingRight:'0'}}
        >
          <SubMenuWrapper>
            <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
              <ListItem component="div">
                <NextLink href="/management/transactions" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/management/transactions'
                    //     ? 'active'
                    //     : ''
                    // }
                    style={{
                      backgroundColor: currentRoute === '/management/transactions' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    销量十佳
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              美味主食
            </ListSubheader>
          }
          style={{paddingLeft:'0',paddingRight:'0'}}
        >
          <SubMenuWrapper>
            <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
              <ListItem component="div">
                <NextLink href="/management/profile" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/management/profile' ? 'active' : ''
                    // }
                    style={{
                      backgroundColor: currentRoute === '/management/profile' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<AccountCircleTwoToneIcon />}
                  >
                    荤菜
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/management/profile/settings" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/management/profile/settings'
                    //     ? 'active'
                    //     : ''
                    // }
                    style={{
                      backgroundColor: currentRoute === '/management/profile/settings' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<DisplaySettingsTwoToneIcon />}
                  >
                    素菜
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              酒水甜点
            </ListSubheader>
          }
          style={{paddingLeft:'0',paddingRight:'0'}}
        >
          <SubMenuWrapper>
            <List component="div" style={{paddingLeft:'0',paddingRight:'0'}}>
              <ListItem component="div">
                <NextLink href="/components/buttons" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/components/buttons' ? 'active' : ''
                    // }
                    style={{
                      backgroundColor: currentRoute === '/components/buttons' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BallotTwoToneIcon />}
                  >
                    酒水
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/modals" passHref>
                  <Button
                    // className={
                    //   currentRoute === '/components/modals' ? 'active' : ''
                    // }
                    style={{
                      backgroundColor: currentRoute === '/components/modals' ? '#98313e' : '',
                      borderRadius:'0',
                    }}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BeachAccessTwoToneIcon />}
                  >
                    甜点
                  </Button>
                </NextLink>
              </ListItem>
             
            </List>
          </SubMenuWrapper>
        </List>
        
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
