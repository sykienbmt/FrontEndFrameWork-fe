import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#76A712',color:"#76A712" }}
      >
        <Tabs value={value} onChange={handleChange} sx={{display:"flex",alignItems:"center"}} aria-label="basic tabs example">s
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Information" {...a11yProps(1)} />
          <Tab label="Comment" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae et architecto eligendi veniam voluptates consectetur corporis eos voluptate? Id, repellendus quidem eaque expedita unde sequi? Perferendis optio deleniti maxime voluptatibus aperiam corrupti vero sint numquam mollitia ea natus vitae provident ipsum impeding dignissimos, accusamus repellendus! Magni repudiandae ullam asperiores.
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
