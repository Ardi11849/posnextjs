'use client'
import { Suspense, useState } from 'react';
import { styled } from '@mui/material/styles';
import Loading from '@/app/component/loading';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Switch, SwitchProps } from '@mui/material';
import { Menus } from '@/global/menus';
import './css/index.css';
import dynamic from 'next/dynamic';
import { StyledTableCell, StyledTableRow } from '@/app/component/styledTable';
import CardLayouts from '@/app/component/cardLayout';

const DynamicHeader = dynamic(() => import('@/app/component/menus/appBar'), {
    loading: () => <Loading />,
})

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 70,
    height: 35,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 0,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(35px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 35,
        height: 35,
    },
    '& .MuiSwitch-track': {
        borderRadius: 35 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function HorizontalLinearStepper() {

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <Suspense fallback={<Loading />}>
            <DynamicHeader title="Dashboard" url="#" />
            <CardLayouts label='Master Role'>
                <TableContainer className='overflow-x-scroll rounded-lg relative' component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead className='bg-white '>
                            <TableRow>
                                <StyledTableCell className='font-bold sticky-column font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400' rowSpan={3}>
                                    Nama Role
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                {Menus.map((row, index) => (
                                    <StyledTableCell key={index} className='font-bold font-mono whitespace-nowrap text-center border-solid border-2 border-gray-400' colSpan={row.list.length}>
                                        {row.labelGroup}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {Menus.map((row, index) => (
                                    row.list.map((row2, index2) => (
                                        <StyledTableCell key={index2} className='font-bold text-center font-mono whitespace-nowrap border-solid border-2 border-gray-400'>{row2.nama}</StyledTableCell>
                                    ))
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell className='whitespace-nowrap sticky-column' component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    {Menus.map((row, index) => (
                                        row.list.map((row2, index2) => (
                                            <StyledTableCell key={index2}>
                                                <IOSSwitch sx={{ m: 1 }} />
                                            </StyledTableCell>
                                        ))
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardLayouts>
        </Suspense>
    )
}