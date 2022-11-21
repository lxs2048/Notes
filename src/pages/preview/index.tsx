import React from 'react'
import Layout from '@theme/Layout';
import lodashJson from './lodash221121.json'
function Preview() {
    return (
        <Layout title="Hello" description="Hello React Page">
            <div className='preview-content'>
            {
                Object.keys(lodashJson).map(item=>{
                    return <div key={item}>
                        {lodashJson[item]}
                    </div>
                })
            }
        </div>
        </Layout>
    )
}

export default Preview