import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LineChart from "./components/LineChart";
import  BarChart  from "./components/BarChart";

function Traffic() {
  // const Posts = () => {
    const [traffic, setTraffic] = useState([]);
    
    useEffect(() => {
      const getTraffic = async () => {
        const resp = await fetch('https://project-1.yangyuxin0714.workers.dev/traffic-change');
        const trafficResp = await resp.json();
        // console.log(postsResp)

        setTraffic(trafficResp);
      };
    
      getTraffic();
    }, []);
    console.log(traffic)


    // const [trafficData, setTrafficData] = useState({
    //   labels: traffic.map(post => 
    //     // post.rankingEntry[0].domain),
    //   {
    //     if (post["meta"].hasOwnProperty("timestamp")) {
    //         return post["meta"]["timestamp"]
    //     }
    //   }),
      
    //   datasets: [
    //     {
    //       label: "Traffic",
    //       data: traffic.map(post => 
    //         // post.rankingEntry[0].domain),
    //       {
    //         if (post["meta"].hasOwnProperty("timestamp")) {
    //             return post["data"]["total"]
    //         }
    //       }),
    //     }
    //   ]

    // })

    // useEffect(() => {
    //   // const getPosts = async () => {
    //     const obj = {
    //         labels: traffic.map(post => 
    //             // post.rankingEntry[0].domain),
    //           {
    //             if (post["meta"].hasOwnProperty("timestamp")) {
    //                 return post["meta"]["timestamp"]
    //             }
    //           }),
              
    //           datasets: [
    //             {
    //               label: "Traffic",
    //               data: traffic.map(post => 
    //                 // post.rankingEntry[0].domain),
    //               {
    //                 if (post["meta"].hasOwnProperty("timestamp")) {
    //                     return post["data"]["total"]
    //                 }
    //               }),
    //             }
    //           ]
          
    //     }
    //     // console.log(postsResp)
    //     setTrafficData(obj);
    //   // };
    
    // }, [traffic]);

    const [trafficData, setTrafficData] = useState({
        labels: traffic.filter(post => 
          // post.rankingEntry[0].domain),
        {
          if (post["meta"].hasOwnProperty("timestamp")) {
              return true
          }
          return false
        }).map(post => post["meta"]["timestamp"]),
        
        datasets: [
          {
            label: "Total Traffic",
            data: traffic.filter(post => 
              // post.rankingEntry[0].domain),
            {
                if (post["meta"].hasOwnProperty("timestamp")) {
                    return true
                }
                return false
            }).map(post => post["data"]["total"]),
          },
          {
            label: "Http Traffic",
            data: traffic.filter(post => 
              // post.rankingEntry[0].domain),
            {
                if (post["meta"].hasOwnProperty("timestamp")) {
                    return true
                }
                return false
            }).map(post => post["data"]["http"]),
          }
        ]
  
      })
  
      useEffect(() => {
        // const getPosts = async () => {
          const obj = {
            labels: traffic.filter(post => 
                // post.rankingEntry[0].domain),
              {
                if (post["meta"].hasOwnProperty("timestamp")) {
                    return true
                }
                return false
              }).map(post => post["meta"]["timestamp"]),
              
              datasets: [
                {
                  label: "Total Traffic",
                  data: traffic.filter(post => 
                    // post.rankingEntry[0].domain),
                  {
                      if (post["meta"].hasOwnProperty("timestamp")) {
                          return true
                      }
                      return false
                  }).map(post => post["data"]["total"]),
                },
                {
                    label: "Http Traffic",
                    data: traffic.filter(post => 
                      // post.rankingEntry[0].domain),
                    {
                        if (post["meta"].hasOwnProperty("timestamp")) {
                            return true
                        }
                        return false
                    }).map(post => post["data"]["http"]),
                  }
              ]
            
          }
          // console.log(postsResp)
          setTrafficData(obj);
        // };
      
      }, [traffic]);
    // console.log(trafficData)
    

    const [metaData, setMetaData] = useState([1,2,3])
    useEffect(() => {
        const obj = traffic.filter(post=> !post["meta"].hasOwnProperty("timestamp")).map(post => post["meta"])
        setMetaData(obj)
    }, [traffic])
    // console.log(metaData)
    // Object.entries(metaData).map(([key, value]) => {
    //     Object.entries(value).map(([key, value]) => {
    //         console.log(key, value)
    //     })
    // })
  return (
    <div className="App">
      <div style={{ width: 1000 }}>
        <h1>Current Traffic Change Over 30 Days</h1>
        <LineChart chartData={trafficData}/>
        <div style={{fontSize:5, textAlign:'left', width:400, color:'#b2b2b2'}}>{Object.entries(metaData).map(([key, value]) => 
         Object.entries(value).map(([k, v]) => 
        <div>{k.split('/')[k.split('/').length-1]}: {v}</div>))}</div>
      </div>
    </div>
  );
}

export default Traffic;
