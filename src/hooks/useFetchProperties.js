import React, { useEffect, useState } from 'react';
import { listProperties } from 'utilities/customQueries';
import { API, graphqlOperation } from 'aws-amplify';

export default function useFetchProperties() {
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(listProperties));
              
            setProperties(result.data.listProperties.items); 
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchProperties()
    },[])

    return { loading, properties, error, fetchProperties };
}
