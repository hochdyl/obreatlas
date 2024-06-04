'use client'
import {ReactElement} from "react";
import {Emoji, EmojiStyle} from "emoji-picker-react";

type MetricCardProps = {
    metric: Metric
}

const MetricCard = ({metric}: MetricCardProps): ReactElement => {
    return (
        <div>
            <table>
                <tbody>
                {metric.emoji &&
                    <tr>
                        <td>Emoji:</td>
                        <td>
                            <Emoji unified={metric.emoji} emojiStyle={EmojiStyle.TWITTER}/>
                        </td>
                    </tr>
                }
                <tr>
                    <td>Name:</td>
                    <td>{metric.name}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <br/>
        </div>
    )
}
export default MetricCard