import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Button,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spinner, Popup } from "components/common";
import { EditWallet, IncreaseValue, DecreaseValue, TransferValue, DeleteWallet } from 'modules/Main/components/WalletForm'
import { getWallets } from "modules/Main/reducers/main";
import styles from "./styles.module.scss";

const TopPage = () => {
    const dispatch = useDispatch();
    const { walletList } = useSelector((state) => ({
        walletList: state.main.walletList,
    }));
    const [selectId, setSelectId] = useState()
    const [number, setNumber] = useState()
    const [currentWalletList, setCurrentWalletList] = useState([])
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [isIncreasePopupOpen, setIsIncreasePopupOpen] = useState(false)
    const [isDecreasePopupOpen, setIsDecreasePopupOpen] = useState(false)
    const [isTransferPopupOpen, setIsTransferPopupOpen] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

    useEffect(() => {
        dispatch(getWallets());
    }, [dispatch]);

    function handleEditOpenPopup(id) {
        setSelectId(id)
        setIsEditPopupOpen(true)
    }

    function handleEditClosePopup() {
        setIsEditPopupOpen(false)
    }

    function handleIncreaseOpenPopup(id) {
        setSelectId(id)
        setIsIncreasePopupOpen(true)
    }

    function handleIncreaseClosePopup() {
        setIsIncreasePopupOpen(false)
    }

    function handleDecreaseOpenPopup(id, number) {
        setSelectId(id)
        setNumber(number)
        setIsDecreasePopupOpen(true)
    }

    function handleDecreaseClosePopup() {
        setIsDecreasePopupOpen(false)
    }

    function handleTransferOpenPopup(id, number) {
        setSelectId(id)
        setNumber(number)
        setCurrentWalletList(walletList.data.filter(wallet => wallet.id !== id))
        setIsTransferPopupOpen(true)
    }

    function handleTransferClosePopup() {
        setIsTransferPopupOpen(false)
    }

    function handleDeleteOpenPopup(id) {
        setSelectId(id)
        setIsDeletePopupOpen(true)
    }

    function handleDeleteClosePopup() {
        setIsDeletePopupOpen(false)
    }

    if (walletList.isLoading) {
        return <Spinner />
    }

    if (walletList.data.length === 0) {
        return null
    }

    return (
        <div className={styles.root}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead className={styles.table}>
                        <TableRow>
                            <TableCell className={styles.cell}>Wallet name</TableCell>
                            <TableCell className={styles.cell}>Wallet value</TableCell>
                            <TableCell className={styles.cell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {walletList.data.map(val => (
                            <TableRow key={val.id}>
                                <TableCell component="th" scope="row">
                                    {val.name}
                                </TableCell>
                                <TableCell>{val.value}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        disabled={val.value === 0 || walletList.data.length <= 1}
                                        onClick={() => handleTransferOpenPopup(val.id, val.value)}
                                    >
                                        Transfer
                                    </Button>
                                    <IconButton
                                        aria-label="increase"
                                        onClick={() => handleIncreaseOpenPopup(val.id)}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="decrease"
                                        onClick={() => handleDecreaseOpenPopup(val.id, val.value)}
                                        disabled={val.value === 0}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleEditOpenPopup(val.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDeleteOpenPopup(val.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Popup
                isOpen={isEditPopupOpen}
                onClose={handleEditClosePopup}
                component={EditWallet}
                title='Edit wallet'
                id={selectId}
            />
            <Popup
                isOpen={isIncreasePopupOpen}
                onClose={handleIncreaseClosePopup}
                component={IncreaseValue}
                title='Increase value'
                id={selectId}
            />
            <Popup
                isOpen={isDecreasePopupOpen}
                onClose={handleDecreaseClosePopup}
                component={DecreaseValue}
                title='Decrease value'
                number={number}
                id={selectId}
            />
            <Popup
                isOpen={isTransferPopupOpen}
                onClose={handleTransferClosePopup}
                component={TransferValue}
                title='Transfer value'
                number={number}
                id={selectId}
                walletList={currentWalletList}
            />
            <Popup
                isOpen={isDeletePopupOpen}
                onClose={handleDeleteClosePopup}
                component={DeleteWallet}
                title='Are you sure you want to delete?'
                id={selectId}
            />
        </div>
    )
}

export default TopPage;
