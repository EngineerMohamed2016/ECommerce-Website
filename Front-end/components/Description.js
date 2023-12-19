import React from 'react'

export default function Description({ product }) {
    return (
        <table class="border w-full mt-6">
            <caption className='text-start text-2xl mb-2'>Description</caption>
            <tbody>
                {/* All Products */}
                <tr>
                    <td>Model Name</td>
                    <td>{product.name}</td>
                </tr>

                <tr>
                    <td>Model Brand</td>
                    <td className='capitalize'>{product.brand}</td>
                </tr>

                {/* Headphones */}
                {
                    !product.cpuModel && !product.battery &&
                    <tr>
                        <td>Connectivity</td>
                        <td>{product.connectivity}</td>
                    </tr>
                }

                {/* Laptops + Mobiles */}
                {
                    (product.cpuSpeed || product.battery) &&
                    <>
                        <tr>
                            <td>Random Memory</td>
                            <td>{product.ram} GB</td>
                        </tr>

                        <tr>
                            <td>Operating System</td>
                            <td>{product.os}</td>
                        </tr>

                        <tr>
                            <td>Screen Size</td>
                            <td>{product.screenSize} Inches</td>
                        </tr>
                    </>

                }

                {
                    product.cpuSpeed ?
                        // Laptops
                        <>
                            <tr>
                                <td>Hard Drive</td>
                                <td>{product.hardMemory} GB {product.hardType}</td>
                            </tr>

                            <tr>
                                <td>CPU Brand</td>
                                <td>{product.cpuBrand}</td>
                            </tr>

                            <tr>
                                <td>CPU Model</td>
                                <td>{product.cpuModel}</td>
                            </tr>

                            <tr>
                                <td>CPU Speed</td>
                                <td>{product.cpuSpeed} GH</td>
                            </tr>

                            <tr>
                                <td>GPU Brand</td>
                                <td>{product.gpuBrand}</td>
                            </tr>

                            <tr>
                                <td>GPU Model</td>
                                <td>{product.gpuModel}</td>
                            </tr>

                            <tr>
                                <td>Wireless Technology</td>
                                <td>{product.wirelessType}</td>
                            </tr>

                            <tr>
                                <td>Touch Screen</td>
                                <td>{product.touch ? 'Yes' : 'No'}</td>
                            </tr>

                        </>
                        :
                        // Mobiles
                        product.battery &&
                        <>
                            <tr>
                                <td>Cellular Technology</td>
                                <td>{product.cellTech}</td>
                            </tr>

                            <tr>
                                <td>Connection Technology</td>
                                <td>{product.connectTech}</td>
                            </tr>

                            <tr>
                                <td>Battery Capacity</td>
                                <td>{product.battery}</td>
                            </tr>

                            <tr>
                                <td>Release Date</td>
                                <td>{product.date}</td>
                            </tr>

                            <tr>
                                <td>Weight</td>
                                <td>{product.weight}</td>
                            </tr>

                            <tr>
                                <td>Wireless Technology</td>
                                <td>{product.wirelessTech}</td>
                            </tr>

                            <tr>
                                <td>Srotrage Size</td>
                                <td>{product.memory} GB</td>
                            </tr>
                        </>
                }
            </tbody>
        </table>
    )
}
