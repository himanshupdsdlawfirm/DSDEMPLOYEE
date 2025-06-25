// viewModels/ClientsViewModel.js
import { useState, useMemo } from 'react';
import { AppImages } from '../../../config/Images';

const clientsViewModel = () => {
  const [searchText, setSearchText] = useState('');
  const [clientsData, setClientsData] = useState([
    { 
      name: 'Himanshu Pathak', 
      alienNumber: 'ABC2028937666',
      phoneNumber: '+919540634090',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Ankit', 
      alienNumber: 'ABC2028937667',
      phoneNumber: '+919540634091',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Aditiya', 
      alienNumber: 'ABC2028937668',
      phoneNumber: '+919540634092',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Ashish', 
      alienNumber: 'ABC2028937669',
      phoneNumber: '+919540634093',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Himanshu', 
      alienNumber: 'ABC2028937670',
      phoneNumber: '+919540634094',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Ankit', 
      alienNumber: 'ABC2028937671',
      phoneNumber: '+919540634095',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Aditiya', 
      alienNumber: 'ABC2028937672',
      phoneNumber: '+919540634096',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
    { 
      name: 'Ashish', 
      alienNumber: 'ABC2028937673',
      phoneNumber: '+919540634097',
      ClientImage: AppImages.userAnimyPlaceholder 
    },
  ]);

  // Memoized filtered clients based on search text
  const filteredClients = useMemo(() => {
    if (!searchText) return clientsData;
    
    const lowerCaseSearch = searchText.toLowerCase();
    return clientsData.filter(client => 
      client.name.toLowerCase().includes(lowerCaseSearch) ||
      client.alienNumber.toLowerCase().includes(lowerCaseSearch) ||
      client.phoneNumber.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchText, clientsData]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return {
    searchText,
    filteredClients,
    handleSearch,
  };
};

export default clientsViewModel;