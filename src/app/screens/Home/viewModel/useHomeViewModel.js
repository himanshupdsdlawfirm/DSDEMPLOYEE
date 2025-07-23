// features/home/viewModel/HomeViewModel.js
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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

  useEffect(() => {
    fetchCaseWorkerList();
    fetchCaseType();
    fetchAttornyList();
    fetchClientList();
    fetchHearingList();
    fetchAppointmentList();
  }, []);

   useFocusEffect(
      useCallback(() => {
        navigation.closeDrawer();
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        return () => {};
      }, []),
    );

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

      const res = data?.data || [];

      // Sort appointments by date and time (most recent first)
      const sortedData = res.sort((a, b) => {
        // Convert time from "02:10 PM" to "14:10" format for proper parsing
        const convertTimeTo24Hour = timeStr => {
          const [time, modifier] = timeStr.split(' ');
          let [hours, minutes] = time.split(':');
          if (hours === '12') hours = '00';
          if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
          return `${hours}:${minutes}`;
        };

        // Create comparable date-time strings
        const dateTimeA = `${a.date}T${convertTimeTo24Hour(a.start_time)}`;
        const dateTimeB = `${b.date}T${convertTimeTo24Hour(b.start_time)}`;

        // Convert to timestamps for comparison
        return new Date(dateTimeB) - new Date(dateTimeA);
      });

      setAppointmentsData(sortedData);

      rootStore.homeStore.setClientList(res);
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

  const fetchCaseType = async () => {
    try {
      const data = await ClientModel.getCaseType();
      rootStore.clientStore.setCaseType(data?.data);
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


  const handleSearchPress = () =>
    navigation.navigate('AppointmentList', {type: 'HomeSearch'});
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
    fetchClientList,
    fetchAppointmentList,
    fetchHearingList,
  };
};
