import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';

interface BasicTabsProps {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    tab1Content: JSX.Element;
    tab2Content: JSX.Element;
    tab3Content: JSX.Element;
}

export default function BasicTabs({ value, onChange, tab1Content, tab2Content, tab3Content, }: BasicTabsProps) {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(event, newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Описание" />
                    <Tab label="Комментарии" />
                    <Tab label="Шаблон документа"></Tab>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {tab1Content}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {tab2Content}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {tab3Content}
            </TabPanel>
        </Box>
    );
}