import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LineChart from "./components/LineChart";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
    },
    scales: {
        y: {
            ticks: {
                format: {
                    style: 'percent'
                }
            }
        }
    }
  };

function Attack() {
  // const Posts = () => {
    const [attack, setAttack] = useState([]);
    
    useEffect(() => {
      const getAttack = async () => {
        const resp = await fetch('https://project-1.yangyuxin0714.workers.dev/attack-layer3');
        const attackResp = await resp.json();
        // console.log(postsResp)

        setAttack(attackResp);
      };
    
      getAttack();
    }, []);
    console.log(attack)

    const [attackData, setAttackData] = useState({
        labels: attack.filter(post => 
          // post.rankingEntry[0].domain),
        {
          if (post["meta"].hasOwnProperty("timestamp")) {
              return true
          }
          return false
        }).map(post => post["meta"]["timestamp"]),
        
        datasets: [
          {
            label: "Attack Volumn",
            data: attack.filter(post => 
              // post.rankingEntry[0].domain),
            {
                if (post["meta"].hasOwnProperty("timestamp")) {
                    return true
                }
                return false
            }).map(post => post["data"]),
          }
        ]
  
      })
  
      useEffect(() => {
        // const getPosts = async () => {
          const obj = {
            labels: attack.filter(post => 
                // post.rankingEntry[0].domain),
              {
                if (post["meta"].hasOwnProperty("timestamp")) {
                    return true
                }
                return false
              }).map(post => post["meta"]["timestamp"]),
              
              datasets: [
                {
                  label: "Attack Volumn",
                  data: attack.filter(post => 
                    // post.rankingEntry[0].domain),
                  {
                      if (post["meta"].hasOwnProperty("timestamp")) {
                          return true
                      }
                      return false
                  }).map(post => post["data"]),
                }
              ]
            
          }
          // console.log(postsResp)
          setAttackData(obj);
        // };
      
      }, [attack]);
    console.log(attackData)

    const [metaData, setMetaData] = useState([1,2,3])
    useEffect(() => {
        const obj = attack.filter(post=> !post["meta"].hasOwnProperty("timestamp")).map(post => post["meta"])
        setMetaData(obj)
    }, [attack])
    console.log(metaData)
  return (
    <div className="App">
      <div style={{ width: 1000 }}>
        <h1>Layer 3 DDoS Attack Volumn Over 30 Days</h1>
        {/* <LineChart chartData={trafficData}/> */}
        <Bar options={options} data={attackData} />
        <div style={{fontSize:5, textAlign:'left', width:400, color:'#b2b2b2'}}>{Object.entries(metaData).map(([key, value]) => 
         Object.entries(value).map(([k, v]) => 
        <div>{k.split('/')[k.split('/').length-1]}: {v}</div>))}</div>
        {/* <div>{metaData.map(post => <div key={post.rankingEntry}>{post.rankingEntry[0].rank}</div>)}</div> */}
      </div>
    </div>
  );
}

export default Attack;
