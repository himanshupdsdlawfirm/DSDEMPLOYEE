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
      // Option 1: If your date string is ISO format (e.g., "2023-12-31T00:00:00Z")
      let date = new Date(dateString);

      // Option 2: If your date string is just "YYYY-MM-DD" without time
      if (isNaN(date.getTime())) {
        date = new Date(dateString + 'T00:00:00Z');
      }

      // If still invalid, try manual parsing
      if (isNaN(date.getTime())) {
        const parts = dateString.split(/[-T]/);
        if (parts.length >= 3) {
          date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
        }
      }

      if (isNaN(date.getTime())) return '--/--/--';

      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const year = String(date.getUTCFullYear()).slice(-2);
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
