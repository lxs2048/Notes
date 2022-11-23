import React from 'react'
import Layout from '@theme/Layout';
import lodashJson from './lodash221121.json'
import styles from './preview.module.scss'
interface LodashMethod {
    [key: string]: string,
};
function Preview() {
    const baseUrl = 'https://www.lodashjs.com/docs/lodash.'
    const lists:LodashMethod = lodashJson
    return (
        <Layout title="预览" description="">
            <div className={`${styles['preview-container']}`}>
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th>lodash方法</th>
                            <th>描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(lists).map(item => {
                                return <tr key={item}>
                                    <td><a target='_black' href={`${baseUrl}${item}`}>{item}</a></td>
                                    <td>{lists[item]}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Preview