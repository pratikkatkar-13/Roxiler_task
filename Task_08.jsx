const TransactionStatistics = ({ month }) => {
    const [statistics, setStatistics] = useState({
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalUnsoldItems: 0,
    });
  
    const fetchStatistics = async (selectedMonth) => {
      try {
        const response = await axios.get(`/api/statistics`, {
          params: { month: selectedMonth }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
  
    useEffect(() => {
      fetchStatistics(month);
    }, [month]);
  
    return (
      <div>
        <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
        <div>Total Sold Items: {statistics.totalSoldItems}</div>
        <div>Total Unsold Items: {statistics.totalUnsoldItems}</div>
      </div>
    );
  };
  