// features/home/viewModel/HomeViewModel.js
import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import rootStore from '../../../stores/rootStore';
import {HomeModel} from '../model/homeModel';
import {ClientModel} from '../../Clients/clientsModel/clientsModel';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const [clientsData, setClientsData] = useState([]);
  const [hearingsData, setHearingsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  // Format date helper
  const formattedDate = useCallback(dateString => {
    if (!dateString) return '--/--/--';
    try {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${month}/${day}/${year}`;
    } catch {
      return '--/--/--';
    }
  }, []);

  const fetchClientList = async () => {
    try {
      rootStore.homeStore.setLoading(true);
      const data = await HomeModel.getClientList(1);
      setClientsData(data?.data);

      rootStore.homeStore.setClientList(data?.data);
    } catch (error) {
      rootStore.homeStore.setError(error.message);
    } finally {
      rootStore.homeStore.setLoading(false);
    }
  };

  const fetchAppointmentList = async () => {
    try {
      rootStore.homeStore.setLoading(true);
      const data = await HomeModel.getAppointmentList(1, 'today');
      console.log('askajskasasa::::', data);

      setAppointmentsData(data?.data);

      rootStore.homeStore.setClientList(data?.data);
    } catch (error) {
      rootStore.homeStore.setError(error.message);
    }
  };

  const fetchHearingList = async () => {
    try {
      rootStore.homeStore.setLoading(true);
      const data = await HomeModel.getHearingList(1);

      console.log('hearing list by home::', data?.data);

      setHearingsData(data?.data);

      rootStore.homeStore.setClientList(data?.data);
    } catch (error) {
      rootStore.homeStore.setError(error.message);
    }
  };

  const fetchCaseWorkerList = async () => {
    try {
      const data = await ClientModel.getCaseWokerList();

      rootStore.clientStore.setCaseWorkerList(data?.data);
    } catch (error) {
      rootStore.homeStore.setError(error.message);
    }
  };

  const fetchAttornyList = async () => {
    try {
      const data = await ClientModel.getEmployeeAttorney();

      rootStore.clientStore.setAttorneyList(data?.data);
    } catch (error) {
      rootStore.homeStore.setError(error.message);
    }
  };

  useEffect(() => {
    fetchCaseWorkerList();
    fetchAttornyList();
    fetchClientList();
    fetchHearingList();
    fetchAppointmentList();
  }, []);

  const handleSearchPress = () => navigation.navigate('Search');
  const handleViewAllClients = () => navigation.navigate('ClientList');
  const handleViewAllAppointments = () =>
    navigation.navigate('AppointmentList');
  const handleViewAllHearings = () =>
    navigation.navigate('HearingList', {backScreen: 'Drawer'});
  const handleOpenDrawer = () => navigation.openDrawer();

  return {
    clientsData,
    appointmentsData,
    hearingsData,
    scrollRef,
    handleSearchPress,
    handleViewAllClients,
    handleViewAllAppointments,
    handleViewAllHearings,
    handleOpenDrawer,
    formattedDate,
    isLoading: rootStore.homeStore.isLoading,
  };
};
