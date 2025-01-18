import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './TodoStats.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const TodoStats: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.items);

  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const completionRate = totalTasks ? (completedTasks / totalTasks * 100).toFixed(1) : '0';

  const priorityStats = {
    high: todos.filter(todo => todo.priority === 'high').length,
    medium: todos.filter(todo => todo.priority === 'medium').length,
    low: todos.filter(todo => todo.priority === 'low').length,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 8,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 0
      }
    }
  };

  const chartData = {
    labels: ['已完成', '未完成'],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ['#52c41a', '#f5f5f5'],
        borderWidth: 0,
      },
    ],
  };

  const priorityChartData = {
    labels: ['高优先级', '中优先级', '低优先级'],
    datasets: [
      {
        data: [priorityStats.high, priorityStats.medium, priorityStats.low],
        backgroundColor: ['#ff4d4f', '#faad14', '#52c41a'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="todo-stats">
      <div className="stats-header">
        <h3>任务统计</h3>
        <div className="completion-rate">
          {completionRate}%
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-container">
          <h4>完成情况</h4>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        
        <div className="chart-container">
          <h4>优先级分布</h4>
          <Doughnut data={priorityChartData} options={chartOptions} />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-label">总数</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">完成</span>
          <span className="stat-value">{completedTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">待办</span>
          <span className="stat-value">{totalTasks - completedTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoStats; 