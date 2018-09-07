<template>
    <div class="iinfo">
        <div class="ititle">{{info[boxdata].title}}</div>
        <div class="icontent" v-html="info[boxdata].content">{{info[boxdata].content}}</div>

    </div>
</template>

<script>
export default {
  name: 'showbox',
  props: ['boxdata'],
  data () {
    return {
      info: [
        {title: '加班规则', content: '\t\t\t\t\t\t\t\t\t<div class="center_box calcu-instruction">\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:-8.9pt;text-indent:10.25pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<b><span style="line-height:150%;">一、总则<span></span></span></b>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoBodyTextIndent" style="text-indent:27.25pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="line-height:150%;">为规范加班管理，提高工作效率，根据《劳动法》及相关法规，结合人才外包实际情况，特制定本规定。<span></span></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:-8.9pt;text-indent:10.25pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<b><span style="line-height:150%;">二、加班的含义<span></span></span></b>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="text-indent:21.0pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="">加班系指在规定工作时间外，因本身工作需要或主管指定事项，必须继续工作者，称为加班。</span><span style=""></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<b><span style="">三、加班的原则</span></b>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:21.0pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="line-height:150%;"><span>1.<span></span></span></span><span style="line-height:150%;">为提倡高效率的工作，鼓励员工在工作时间内完成本职工作任务，原则上不提倡加班，如因处理工作时间内未完成的本职工作或本人工作疏忽而未完成的工作，不计加班。<span></span></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:21.0pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="line-height:150%;"><span>2.<span></span></span></span><span style="line-height:150%;">严格控制加班加点的时限，保证员工的休息时间。<span></span></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<b><span style="line-height:150%;">四、加班的计算方式<span></span></span></b>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:21.0pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="line-height:150%;"><span>1.<span></span></span></span><span style="line-height:150%;">加班时间以<span>0.5</span>小时为单位计算<span>,</span></span><span> </span><span style="line-height:150%;">正常工作日按<span>1:1</span>计算加班时间，周末按<span>1:2</span>计算加班时间，法定节日按<span>1:3</span>计算加班时间，并以此作为计算工作量的依据。<span></span></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal" style="margin-left:21.0pt;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span style="line-height:150%;"><span>2.<span></span></span></span><span style="line-height:150%;">工作日正常下班<span>1.5</span>小时后至上班<span>1.5</span>小时前的时间内工作算加班。<span></span></span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p class="MsoNormal">\n' +
        '\t\t\t\t\t\t\t\t\t\t<span style="margin-left:21.0pt;">3.周末和法定节日工作算加班。</span>\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<span style="margin-left:21.0pt;">4.周末和法定节日工作时间基数与工作日计算方式一致，最后基数乘以相应倍数为最终加班时间。</span>\n' +
        '\t\t\t\t\t\t\t\t\t</div>'},
        {title: '工作量统计及计算方式', content: '<div class="center_box calcu-instruction">\n' +
        '\t\t\t\t\t\t\t\t\t\t<h5>人月费用计算方法： </h5>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t∑（乙方技术服务人员工作量×技术服务人员人月单价）；\n' +
        '\t\t\t\t\t\t\t\t\t\t\t甲方支付的技术开发费按人员单价及核定工作量支付人员费用，包括甲方因甲方工作需要安排乙方技术服务人员出差的差旅费用，除此之外，甲方不承担其他任何人员相关费用，包括但不限于差旅费、补贴、证件办理费、医疗费、保险费、交通费、住宿费、伙食费、团队活动等各种费用；\n' +
        '\t\t\t\t\t\t\t\t\t\t\t上述费用均包含增值税。\n' +
        '\t\t\t\t\t\t\t\t\t\t\t乙方技术服务人员因甲方工作需要安排出差的差旅费标准按甲方普通员工差旅费标准计算。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<h5>工作量计算方法： </h5>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t作量计算方法：\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(a)技术服务人员月工作量=该技术人员当月实际工作日/当月工作日，四舍五入后保留3位小数；\n' +
        '\t\t\t\t\t\t\t\t\t\t\t技术服务人员工作量=∑（技术服务人员月工作量）；\n' +
        '\t\t\t\t\t\t\t\t\t\t\t当月工作日=当月自然日-当月公休日-当月国家法定节假日。\n' +
        '\t\t\t\t\t\t\t\t\t\t\t甲方如需加班，加班按照国家规定工作日8小时计算，7点后算加班，按照正常工时1比1方式核算工作量，周末按照1比2核算工作量，法定节日按照1比3核算工作量。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(b)若甲方明确要求技术服务人员服务周期预计超过1个月的情况，乙方技术服务人员在甲方到岗工作不足10个工作日就离岗，其当月工作量均按照以下公式计算： 工作不超过5个工作日（含5个工作日）的，当月该技术服务人员工作量=0；工作超过5个工作日的（不含5个工作日），当月该技术服务人员工作量=（该技术服务人员当月实际工作日/当月工作日）/2, 四舍五入后保留3位小数。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(c)若甲方按照任务方式采购乙方技术服务人员进行服务，预计工作周期小于1个月的情况，乙方技术服务人员有3个工作日的试用期，在3个工作日内，如果乙方技术人员不满足甲方工作要求，甲方可对乙方技术服务人员进行退岗处理并说明退岗原因，其当月工作量=0；超过3个工作日，代表该技术服务人员符合甲方要求，其工作量应按照到(a)方式进行统计，其工作量应包含试用期的3个工作日。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(d)在一个支付周期内，乙方技术服务人员加班时间可冲减请假时间，超过部分不予计算。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<h5>结算和支付方式： </h5>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(a)乙方提供正规增值税专用发票，甲方于收到乙方开具的合法有效的增值税专用发票且该发票经税务机关认证可用于抵扣之日起【5】个工作日内向乙方支付服务费。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t\t<p>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t(b)乙方应于开具增值税专用发票之日起5个工作日内将发票交付给甲方。由于乙方或第三方原因导致发票超过税务机关抵扣认证期限的，由此产生的责任和后果由乙方承担。增值税专用发票如丢失或毁损，乙方应无条件协助配合甲方取得包括但不限于原始凭据的复印件或已缴税证明等替代性材料，以保证甲方顺利实现认证抵扣，因此产生的费用由乙方承担。\n' +
        '\t\t\t\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t\t\t</div>'}
      ]
    }
  }
}
</script>

<style scoped>
.iinfo {
    padding: 15px;
}
    .ititle{
        font-size: 18px;
        text-align: center;
        padding-bottom: 10px;
        color: #0071b7;
    }
</style>
